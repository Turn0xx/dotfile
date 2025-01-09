defmodule TimeManagerWeb.TimeTracking.Infrastructure.WorkingTimeController do
  use TimeManagerWeb, :controller
  alias TimeManager.TimeTracking.{WorkingTime , Application.ManageWorkingTimeService}
  alias TimeManager.TimeTracking.Infrastructure.{WorkingTimePresenter}

  action_fallback TimeManagerWeb.FallbackController

  # def index(conn, %{"userID" => userID, "id" => id}) do


  # end

  # def index(conn, %{"userID" => userID, "start" => start, "end" => :end}) do

  # end

  # def index(conn, _params) do
  #   conn
  #   |> put_status(:bad_request)
  #   |> put_view(TimeManagerWeb.ErrorView)
  #   |> render("400.json", message: "Invalid parameters")
  # end

  # def create(conn, %{"userID" => userID, "working_time" => working_time_params}) do
  #   with {:ok, %WorkingTime{} = working_time} <- ManageWorkingTimeService
  # end

  def create(conn , %{"userID" => userID, "working_time" => working_time_params}) do
    with {:ok, %WorkingTime{} = working_time} <- ManageWorkingTimeService.create_working_time(%{"userID" => userID, "working_time" => working_time_params}) do
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
    else {:error, message} ->
      conn
      |> put_status(:not_found)
      |> put_view(TimeManagerWeb.ErrorView)
      |> render("404.json", message: message)
    end
  end

  # def update(conn, %{"userID" => userID, "working_time" => working_time_params}) do
  #   with {:ok, %WorkingTime{} = working_time} <- ManageWorkingTimeService.update_working_time(%{"userID" => userID, "working_time" => working_time_params}) do
  #     conn
  #     |> put_status(:ok)
  #     |> put_view(WorkingTimePresenter)
  #     |> render(:present_working_time, working_time: working_time)
  #   else nil ->
  #     conn
  #     |> put_status(:not_found)
  #     |> put_view(TimeManagerWeb.ErrorView)
  #     |> render("404.json", message: 'aa')

  #   end
  # end

  def update(conn, %{"id" => id, "working_time" => working_time_params}) do
    with {:ok, %WorkingTime{} = working_time} <- ManageWorkingTimeService.update_working_time(%{"id" => id, "working_time" => working_time_params}) do
      conn
      |> put_status(:ok)
      |> put_view(WorkingTimePresenter)
      |> render(:present_working_time, working_time: working_time)
    else {:error, _} ->
      conn
      |> put_status(:not_found)
      |> put_view(TimeManagerWeb.ErrorView)
      |> render("404.json", message: 'Ressource not found')

    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, working_time} <- ManageWorkingTimeService.get_work_time(%{"id" => id}) do
      conn
      |> put_status(:ok)
      |> put_view(WorkingTimePresenter)
      |> render(:present_working_time, working_time: working_time)
    else {:error, message} ->
      conn
      |> put_status(:not_found)
      |> put_view(TimeManagerWeb.ErrorView)
      |> render("404.json", message: message)
    end

  end




end
