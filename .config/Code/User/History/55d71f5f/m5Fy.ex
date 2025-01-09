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
      |> render_result(working_time, :created)
    end
  end

  def show(conn, %{"userID" => _userID, "id" => id}) do
    with {:ok, working_time} <- ManageWorkingTimeService.get_work_time(%{"id" => id}) do
      conn
      |> render_result(working_time)
    else
      {:error, _} ->
        conn
        |> render_error("404.json", :not_found)
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
      |> render_result(working_times)
    end
  end

  def update(conn, %{"id" => id, "working_time" => working_time_params}) do
    with {:ok, %WorkingTime{} = working_time} <-
           ManageWorkingTimeService.update_working_time(%{
             "id" => id,
             "working_time" => working_time_params
           }) do
      conn
      |> render_result(working_time)
    else
      {:error, _} ->
        conn
        |> render_error("404.json", :not_found)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, working_time} <- ManageWorkingTimeService.get_work_time(%{"id" => id}) do
      with {:ok, _} <- ManageWorkingTimeService.delete_working_time(working_time) do
        conn
        |> render_result(working_time, :no_content)
      else
        {:error, _} ->
          conn
          |> render_error("404.json", :not_found)
      end
    else
      {:error, _} ->
        conn
        |> render_error("404.json")
    end
  end

  defp render_result(conn, result, status \\ :ok) do
    conn
    |> put_status(status)
    |> put_view(WorkingTimePresenter)
    |> pipe_render(result)
  end

  defp pipe_render(conn, result) do
    case is_list(result) do
      true -> render(conn, :present_working_times, working_times: result)
      false -> render(conn, :present_working_time, working_time: result)
    end
  end

  defp render_error(conn, template, status \\ :not_found) do
    conn
    |> put_status(status)
    |> put_view(TimeManagerWeb.ErrorView)
    |> render(template)
  end
end
