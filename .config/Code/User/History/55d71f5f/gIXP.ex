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

  def update(conn, %{"userID" => userID, "working_time" => working_time_params}) do
    with {:ok, %WorkingTime{} = working_time} <- ManageWorkingTimeService.update_working_time(%{"userID" => userID, "working_time" => working_time_params}) do
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




end
