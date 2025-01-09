defmodule TimeManagerWeb.FallbackController do
  use TimeManagerWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(TimeManagerWeb.ErrorView)
    |> render(:"422", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(TimeManagerWeb.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:unauthorized)
    |> put_view(TimeManagerWeb.ErrorView)
    |> render(:"401")
  end

  def call(conn, _params) do
    IO.puts("Internal server error")
    IO.puts(_params)

    conn
    |> put_status(:internal_server_error)
    |> put_view(TimeManagerWeb.ErrorView)
    |> render(:"500")
  end


end
