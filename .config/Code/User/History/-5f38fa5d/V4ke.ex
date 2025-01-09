defmodule TimeManagerWeb.UserController do
  use TimeManagerWeb, :controller

  alias TimeManager.{User, ManageUserService, Infrastructure.UserPresenter}


  action_fallback TimeManagerWeb.FallbackController

  def index(conn, %{"email" => email, "username" => username}) do
    with {:ok, user} <- ManageUserService.get_user_by_email_and_username(email, username) do
      conn
      |> put_view(json: UserPresenter)
      |> render(:present_user, user: user)
    else
      _ ->
        conn
        |> put_status(:not_found)
        |> render(TimeManagerWeb.ErrorView, "404.json")
      end
  end

  def index(conn, _params) do
    users = ManageUserService.get_users()
    conn
    |> put_view(json: UserPresenter)
    |> render(:present_users, users: users)
  end



  def show(conn, %{"id" => id}) do
    case ManageUserService.get_user_by_id(id) do
      {:ok, user} ->
        conn
        |> put_view(json: UserPresenter)
        |> render(:present_user, user: user)
      {:error, _reason} ->
        conn
        |> put_status(:not_found)
        |> render(TimeManagerWeb.ErrorView, "404.json")
    end
  end

  def show_by_email_and_username(conn, %{"email" => email, "username" => username}) do
    case ManageUserService.get_user_by_email_and_username(email, username) do
      {:ok, user} ->
        conn
        |> put_view(json: UserPresenter)
        |> render(:present_user, user: user)
      {:error, _reason} ->
        conn
        |> put_status(:not_found)
        |> render(TimeManagerWeb.ErrorView, "404.json")
    end
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- ManageUserService.create_user(user_params) do
      conn
      |> put_view(json: UserPresenter)
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/users/#{user}")
      |> render(:present_user, user: user)
    end
  end

  # def update(conn, %{"id" => id, "user" => user_params}) do
  #   case ManageUserService.get_user_by_id(id) do
  #     {:ok, user} ->
  #       with {:ok, %User{} = user} <- User.update_user(user, user_params) do
  #         conn
  #         |> put_view(json: UserPresenter)
  #         |> render(:present_user, user: user)
  #       else
  #         {:error, changeset} ->
  #           conn
  #           |> put_status(:unprocessable_entity)
  #           |> put_view(json: TimeManagerWeb.ErrorView)
  #           |> render("422.json", changeset: changeset)
  #       end
  #     {:error, _reason} ->
  #       conn
  #       |> put_status(:not_found)
  #       |> render(TimeManagerWeb.ErrorView, "404.json")
  #   end
  # end

  def update(conn, %{"id" => id, "user" => user_params}) do
    case ManageUserService.get_user_by_id(id) do
      {:ok, user} ->
        IO.inspect(user, label: "User before update")
        result = ManageUserService.update_user(user, user_params)
        IO.inspect(result, label: "Update result")

        with {:ok, updated_user} <- result do
          conn
          |> put_view(json: UserPresenter)
          |> render(:present_user, user: updated_user)
        else
          unexpected_value ->
            conn
            |> put_status(:internal_server_error)
            |> put_view(TimeManagerWeb.ErrorView)
            |> render("500.json", message: "Unexpected value: #{inspect(unexpected_value)}")
        end

      {:error, _reason} ->
        conn
        |> put_status(:not_found)
        |> render(TimeManagerWeb.ErrorView, "404.json")
    end
  end

  def update(conn, _params) do
    IO.puts("update bad request")

    conn
    |> put_status(:bad_request)
    |> put_view(json: TimeManagerWeb.ErrorView)
    |> render("400.json", message: "Missing id or user params")
  end



end
