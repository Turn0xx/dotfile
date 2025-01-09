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
      |> put_status(:created)
      |> put_view(WorkingTimePresenter)
      |> render(:present_working_time, working_time: working_time)
    end
  end

  def show(conn, %{"userID" => _userID, "id" => id}) do
    with {:ok, working_time} <- ManageWorkingTimeService.get_work_time(%{"id" => id}) do
      conn
      |> put_status(:ok)
      |> put_view(WorkingTimePresenter)
      |> render(:present_working_time, working_time: working_time)
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
      |> put_status(:ok)
      |> put_view(WorkingTimePresenter)
      |> render(:present_working_times, working_times: working_times)
    end
  end

  def update(conn, %{"id" => id, "working_time" => working_time_params}) do
    with {:ok, %WorkingTime{} = working_time} <-
           ManageWorkingTimeService.update_working_time(%{
             "id" => id,
             "working_time" => working_time_params
           }) do
      conn
      |> put_status(:ok)
      |> put_view(WorkingTimePresenter)
      |> render(:present_working_time, working_time: working_time)
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
      result = ManageWorkingTimeService.delete_working_time(working_time)

      case result do
        {:ok, _} ->
          conn
          |> put_status(:no_content)
          |> put_view(WorkingTimePresenter)
          |> render(:present_working_time, working_time: working_time)

        {:error, message} ->
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
end
