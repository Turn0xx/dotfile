defmodule TimeManagerWeb.ClockControllerTest do
  use TimeManagerWeb.ConnCase
  alias DialyxirVendored.Formatter.IgnoreFile
  alias TimeManager.Accounts.Application.ManageUserService
  alias TimeManager.TimeTracking.Application.ManageClockService

  test "POST /api/clocks/{userID} with status on false", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn =
      post(conn, ~s"/api/clocks/#{user.id}", %{
        "clock" => %{
          "time" => "2021-01-01T00:00:00Z",
          "status" => false
        }
      })

    body = Jason.decode!(conn.resp_body)

    assert conn.status == 201
    assert body["id"] != nil
    assert body["time"] == "2021-01-01T00:00:00Z"
    assert body["status"] == false
    assert body["user_id"] == user.id
  end

  test "POST /api/clocks/{userID} with status on true", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn =
      post(conn, ~s"/api/clocks/#{user.id}", %{
        "clock" => %{
          "time" => "2021-01-01T00:00:00Z",
          "status" => true
        }
      })

    body = Jason.decode!(conn.resp_body)

    assert conn.status == 201
    assert body["id"] != nil
    assert body["time"] == "2021-01-01T00:00:00Z"
    assert body["status"] == true
    assert body["user_id"] == user.id
  end

  test "POST /api/clocks/{userID} with invalid status", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn =
      post(conn, ~s"/api/clocks/#{user.id}", %{
        "clock" => %{
          "time" => "2021-01-01T00:00:00Z",
          "status" => "invalid"
        }
      })

    body = Jason.decode!(conn.resp_body)

    assert conn.status == 422

    assert body == %{
             "errors" => %{
               "status" => ["is invalid"]
             }
           }
  end

  test "POST /api/clocks/{userID} with invalid time", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn =
      post(conn, ~s"/api/clocks/#{user.id}", %{
        "clock" => %{
          "time" => "invalid",
          "status" => true
        }
      })

    body = Jason.decode!(conn.resp_body)

    assert conn.status == 422

    assert body == %{
             "errors" => %{
               "time" => ["is invalid"]
             }
           }
  end

  test "POST /api/clocks/{userID} with invalid time & invalid status", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    conn =
      post(conn, ~s"/api/clocks/#{user.id}", %{
        "clock" => %{
          "time" => "invalid",
          "status" => "invalid"
        }
      })

    body = Jason.decode!(conn.resp_body)

    assert conn.status == 422

    assert body == %{
             "errors" => %{
               "time" => ["is invalid"],
               "status" => ["is invalid"]
             }
           }
  end

  test "GET /api/clocks/{userID}", %{conn: conn} do
    {:ok, user} =
      ManageUserService.create_user(%{
        "username" => "test",
        "email" => "test@test.fr"
      })

    {:ok, clock} =
      ManageClockService.create_clock(%{
        "userID" => user.id,
        "clock" => %{
          "time" => "2021-01-01T00:00:00Z",
          "status" => true
        }
      })

    conn = get(conn, ~s"/api/clocks/#{user.id}")

    body = Jason.decode!(conn.resp_body)

    assert conn.status == 200
    assert length(body["data"]) == 1
    assert hd(body["data"]) == %{
             "id" => clock.id,
             "time" => "2021-01-01T00:00:00Z",
             "status" => true,
             "user_id" => user.id
           }

  end
end
