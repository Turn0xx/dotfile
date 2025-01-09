defmodule TimeManagerWeb.UserController do
  use TimeManagerWeb, :controller

  alias TimeManager.{Accounts.User, ManageUserService, Infrastructure.UserPresenter}

  action_fallback TimeManagerWeb.FallbackController

  def index(conn, %{"email" => email, "username" => username}) do
    with {:ok, user} <- ManageUserService.get_user_by_email_and_username(email, username) do
      conn
      |> render_result(user)
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
    |> render_result(users)
  end

  def show(conn, %{"id" => id}) do
    case ManageUserService.get_user_by_id(id) do
      {:ok, user} ->
        conn
        |> render_result(user)

      {:error, _reason} ->
        conn
        |> put_status(:not_found)
        |> render(TimeManagerWeb.ErrorView, "404.json")
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
        IO.inspect(user, label: "User before update")
        result = ManageUserService.update_user(user, user_params)
        IO.inspect(result, label: "Update result")

        with {:ok, updated_user} <- result do
          conn
          |> render_result(updated_user)
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
    conn
    |> put_status(:bad_request)
    |> put_view(json: TimeManagerWeb.ErrorView)
    |> render("400.json", message: "Missing user params")
  end

  def delete(conn, %{"id" => id}) do
    case ManageUserService.get_user_by_id(id) do
      {:ok, user} ->
        IO.inspect(user, label: "User before delete")
        result = ManageUserService.delete_user(user)
        IO.inspect(result, label: "Delete result")

        conn
        |> render_result(user, :no_content)

      {:error, _reason} ->
        conn
        |> put_status(:not_found)
        |> render(TimeManagerWeb.ErrorView, "404.json")
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
