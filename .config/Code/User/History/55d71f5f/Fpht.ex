defmodule TimeManagerWeb.TimeTracking.Infrastructure.WorkingTimeController do
  use TimeManagerWeb, :controller
  alias TimeManager.TimeTracking.{WorkingTime, Application.ManageWorkingTimeService}
  alias TimeManager.TimeTracking.Infrastructure.{WorkingTimePresenter}

  action_fallback TimeManagerWeb.FallbackController

  def create(conn, %{"userID" => userID, "working_time" => working_time_params}) do
    with {:ok, %WorkingTime{} = working_time} <-
           ManageWorkingTimeService.create_working_time(%{
             "userID" => userID,
             "working_time" => working_time_params
           }) do
      conn
      |> render_working_time(working_time, :created)
    end
  end

  def show(conn, %{"userID" => _userID, "id" => id}) do
    with {:ok, working_time} <- ManageWorkingTimeService.get_work_time(%{"id" => id}) do
      conn
      |> render_working_time(working_time)
    else
      {:error, message} ->
        conn
        |> put_status(:not_found)
        |> put_view(TimeManagerWeb.ErrorView)
        |> render("404.json", message: message)
    end
  end

  def show(conn, %{"userID" => userID, "start_time" => start, "end_time" => end_time}) do
    with {:ok, working_times} <-
           ManageWorkingTimeService.get_work_time_by_user_id_and_time_range(%{
             "userID" => userID,
             "start_time" => start,
             "end_time" => end_time
           }) do
      conn
      |> render_working_times(working_times)
    end
  end

  def update(conn, %{"id" => id, "working_time" => working_time_params}) do
    with {:ok, %WorkingTime{} = working_time} <-
           ManageWorkingTimeService.update_working_time(%{
             "id" => id,
             "working_time" => working_time_params
           }) do
      conn
      |> render_working_time(working_time)
    else
      {:error, _} ->
        conn
        |> put_status(:not_found)
        |> put_view(TimeManagerWeb.ErrorView)
        |> render("404.json", message: ~c"Ressource not found")
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, working_time} <- ManageWorkingTimeService.get_work_time(%{"id" => id}) do
      with {:ok, _} <- ManageWorkingTimeService.delete_working_time(working_time) do
        conn
        |> render_working_time(working_time, :no_content)
      else
        {:error, _} ->
          conn
          |> put_status(:not_found)
          |> put_view(TimeManagerWeb.ErrorView)
          |> render("404.json", message: message)
      end
    else
      {:error, message} ->
        conn
        |> put_status(:not_found)
        |> put_view(TimeManagerWeb.ErrorView)
        |> render("404.json", message: message)
    end
  end

  defp render_working_time(conn, working_time, status \\ :ok) do
    conn
    |> put_status(status)
    |> put_view(WorkingTimePresenter)
    |> render(:present_working_time, working_time: working_time)
  end

  defp render_working_times(conn, working_times, status \\ :ok) do
    conn
    |> put_status(status)
    |> put_view(WorkingTimePresenter)
    |> render(:present_working_times, working_times: working_times)
  end

  defp render_error(conn, template, status \\ :not_found) do
    conn
    |> put_status(status)
    |> put_view(TimeManagerWeb.ErrorView)
    |> render(template)
  end
end
