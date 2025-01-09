defmodule TimeManagerWeb.UserControllerTest do
  use TimeManagerWeb.ConnCase
  alias DialyxirVendored.Formatter.IgnoreFile
  alias TimeManager.Accounts.Application.ManageUserService

  test "GET /api/users", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn = get(conn, ~p"/api/users")
    body = Jason.decode!(conn.resp_body)
    assert conn.status == 200
    assert body["data"] != nil

    assert Enum.any?(body["data"], fn u ->
             u["email"] == user.email && u["username"] == user.username
           end)
  end

  test "GET /api/users with parameters", %{conn: conn} do
    ManageUserService.create_user(%{
      "username" => "test",
      "email" => "test@test.fr"
    })

    {:ok, inserted_user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "a@b.c"
      })

    conn = get(conn, ~p"/api/users?email=a@b.c&username=test")
    user = Jason.decode!(conn.resp_body)
    assert conn.status == 200
    assert %{"email" => _email, "id" => _id, "username" => _username} = user
    assert user["email"] == inserted_user.email
    assert user["username"] == inserted_user.username
    assert user["id"] == inserted_user.id
  end

  test "GET /api/users with invalid parameters", %{conn: conn} do
    conn = get(conn, ~p"/api/users?email=a@b.c&username=test")
    assert conn.status == 404
    assert Jason.decode!(conn.resp_body) == %{"errors" => %{"detail" => "Resource not found"}}
  end

  test "GET /api/users/:id", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn = get(conn, ~s"/api/users/#{user.id}")
    body = Jason.decode!(conn.resp_body)

    assert conn.status == 200
    assert body["email"] == user.email
    assert body["username"] == user.username
    assert body["id"] == user.id
  end

  test "GET /api/users/:id with invalid id", %{conn: conn} do
    conn = get(conn, ~s"/api/users/invalid_id")
    assert conn.status == 404
    assert Jason.decode!(conn.resp_body) == %{"errors" => %{"detail" => "Resource not found"}}
  end

  test "GET /api/users/:id with not found id", %{conn: conn} do
    conn = get(conn, ~s"/api/users/00000000-0000-0000-0000-000000000000")
    assert conn.status == 404
    assert Jason.decode!(conn.resp_body) == %{"errors" => %{"detail" => "Resource not found"}}
  end

  test "POST /api/users", %{conn: conn} do
    conn =
      post(conn, ~p"/api/users", %{
        "user" => %{
          "username" => "test",
          "email" => "test@test.fr"
        }
      })

    body = Jason.decode!(conn.resp_body)

    assert conn.status == 201
    assert body["email"] == "test@test.fr"
    assert body["username"] == "test"
    assert body["id"] != nil
  end

  test "POST /api/users without email", %{conn: conn} do
    conn =
      post(conn, ~p"/api/users", %{
        "user" => %{
          "username" => "test"
        }
      })

    assert conn.status == 422

    assert Jason.decode!(conn.resp_body) == %{
             "errors" => %{
               "email" => ["can't be blank"]
             }
           }
  end

  test "POST /api/users without username", %{conn: conn} do
    conn =
      post(conn, ~p"/api/users", %{
        "user" => %{
          "email" => "test@test.fr"
        }
      })

    assert conn.status == 422

    assert Jason.decode!(conn.resp_body) == %{
             "errors" => %{
               "username" => ["can't be blank"]
             }
           }
  end

  test "POST /api/users with existing email", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn =
      post(conn, ~p"/api/users", %{
        "user" => %{
          "username" => user.username,
          "email" => user.email
        }
      })

    assert conn.status == 422

    assert Jason.decode!(conn.resp_body) == %{
             "errors" => %{
               "email" => ["has already been taken"]
             }
           }
  end

  test "POST /api/users with invalid email", %{conn: conn} do
    conn =
      post(conn, ~p"/api/users", %{
        "user" => %{
          "username" => "test",
          "email" => "test"
        }
      })

    assert conn.status == 422

    assert Jason.decode!(conn.resp_body) == %{
             "errors" => %{
               "email" => ["has invalid format"]
             }
           }
  end

  test "POST /api/users with existing username", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn =
      post(conn, ~p"/api/users", %{
        "user" => %{
          "username" => user.username,
          "email" => "test2@test.fr"
        }
      })

    assert conn.status == 201
    body = Jason.decode!(conn.resp_body)
    assert body["email"] == "test2@test.fr"
    assert body["username"] == user.username
    assert body["id"] != nil
  end

  test "PUT /api/users/:id", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    new_username = "test2"
    new_email = "test-updated-full@test.fr"

    conn =
      put(conn, ~s"/api/users/#{user.id}", %{
        "user" => %{
          "username" => new_username,
          "email" => new_email
        }
      })

    assert conn.status == 200

    body = Jason.decode!(conn.resp_body)

    assert body["email"] == new_email
    assert body["username"] == new_username
    assert body["id"] == user.id
  end

  test "PUT /api/users/:id only with username", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    new_username = "test2"

    conn =
      put(conn, ~s"/api/users/#{user.id}", %{
        "user" => %{
          "username" => new_username
        }
      })

    assert conn.status == 200

    body = Jason.decode!(conn.resp_body)

    assert body["email"] == user.email
    assert body["username"] == new_username
    assert body["id"] == user.id
  end

  test "PUT /api/users/:id only with email", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    new_email = "test-updated-email@test.fr"

    conn =
      put(conn, ~s"/api/users/#{user.id}", %{
        "user" => %{
          "email" => new_email
        }
      })

    assert conn.status == 200

    body = Jason.decode!(conn.resp_body)

    assert body["email"] == new_email
    assert body["username"] == user.username
    assert body["id"] == user.id
  end

  test "PUT /api/users/:id with invalid email", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn =
      put(conn, ~s"/api/users/#{user.id}", %{
        "user" => %{
          "email" => "test"
        }
      })

    assert conn.status == 500

    assert Jason.decode!(conn.resp_body) == %{
             "errors" => %{
               "detail" => "Internal server error"
             }
           }
  end

  test "PUT /api/users/:id with invalid id", %{conn: conn} do
    conn =
      put(conn, ~s"/api/users/invalid_id", %{
        "user" => %{
          "username" => "test"
        }
      })

    assert conn.status == 404
    assert Jason.decode!(conn.resp_body) == %{"errors" => %{"detail" => "Resource not found"}}
  end

  test "PUT /api/users/:id with not found id", %{conn: conn} do
    conn =
      put(conn, ~s"/api/users/00000000-0000-0000-0000-000000000000", %{
        "user" => %{
          "username" => "test"
        }
      })

    assert conn.status == 404
    assert Jason.decode!(conn.resp_body) == %{"errors" => %{"detail" => "Resource not found"}}
  end

  test "DELETE /api/users/:id", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn = delete(conn, ~s"/api/users/#{user.id}")
    assert conn.status == 204
  end

  test "DELETE /api/users/:id with invalid id", %{conn: conn} do
    conn = delete(conn, ~s"/api/users/invalid_id")
    assert conn.status == 404
    assert Jason.decode!(conn.resp_body) == %{"errors" => %{"detail" => "Resource not found"}}
  end

  test "DELETE /api/users/:id with not found id", %{conn: conn} do
    conn = delete(conn, ~s"/api/users/00000000-0000-0000-0000-000000000000")
    assert conn.status == 404
    assert Jason.decode!(conn.resp_body) == %{"errors" => %{"detail" => "Resource not found"}}
  end
end
