defmodule TimeManagerWeb.UserController do
  use TimeManagerWeb, :controller

  alias TimeManager.{User, ManageUserService, Infrastructure.UserPresenter}


  action_fallback TimeManagerWeb.FallbackController

  def index(conn, params) do
    users = case params do
      %{"email" => email, "username" => username} ->
        ManageUserService.get_user_by_email_and_username(email, username)
      _ ->
        ManageUserService.get_users()
    end

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
end
