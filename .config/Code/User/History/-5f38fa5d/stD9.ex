defmodule TimeManagerWeb.Accounts.Infrastructure.UserController do
  use TimeManagerWeb, :controller
  alias TimeManager.Accounts.{User, Application.ManageUserService, Infrastructure.UserPresenter}

  action_fallback TimeManagerWeb.FallbackController

  def index(conn, %{"email" => email, "username" => username}) do
    with {:ok, user} <- ManageUserService.get_user_by_email_and_username(email, username) do
      conn
      |> render_result(user)
    else
      _ ->
        conn
        |> render_error("404.json", :not_found)
    end
  end

  def index(conn, _params) do
    users = ManageUserService.get_users()

    conn
    |> render_result(users)
  end

  def show(conn, %{"id" => id}) do
    case ManageUserService.get_user_by_id(id) do
      {:ok, user} ->
        conn
        |> render_result(user)

      {:error, _reason} ->
        conn
        |> render_error("404.json", :not_found)
    end
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- ManageUserService.create_user(user_params) do
      conn
      |> render_result(user, :created)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    case ManageUserService.get_user_by_id(id) do
      {:ok, user} ->
        result = ManageUserService.update_user(user, user_params)

        with {:ok, updated_user} <- result do
          conn
          |> render_result(updated_user)
        else
          _ ->
            conn
            |> render_error("500.json", :internal_server_error)
        end

      {:error, _reason} ->
        conn
        |> render_error("404.json", :not_found)
    end
  end

  def update(conn, _params) do
    conn
    |> render_error("400.json", :bad_request)
  end

  def delete(conn, %{"id" => id}) do
    case ManageUserService.get_user_by_id(id) do
      {:ok, user} ->
        ManageUserService.delete_user(user)

        conn
        |> render_result(user, :no_content)

      {:error, _reason} ->
        conn
        |> render_error("404.json", :not_found)
    end
  end

  defp render_result(conn, result, status \\ :ok) do
    conn
    |> put_status(status)
    |> put_view(UserPresenter)
    |> pipe_render(result)
  end

  defp pipe_render(conn, result) do
    case is_list(result) do
      true -> render(conn, :present_users, users: result)
      false -> render(conn, :present_user, user: result)
    end
  end

  defp render_error(conn, template, status) do
    conn
    |> put_status(status)
    |> put_view(TimeManagerWeb.ErrorView)
    |> render(template)
  end
end
