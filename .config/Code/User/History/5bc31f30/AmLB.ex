defmodule TimeManager.TimeTracking.Application.ManageWorkingTimeService do
  alias TimeManager.TimeTracking.{WorkingTime, Infrastructure.WorkingTimeRepository}
  alias TimeManager.UserRepository

  def create_working_time(%{"userID" => userID, "working_time" => working_time_params}) do
    case UserRepository.get_by_id(userID) do
      nil ->
        {:error, "User not found"}

      user ->
        %WorkingTime{}
        |> WorkingTime.changeset(%{
          start_time: Map.get(working_time_params, "start"),
          end_time: Map.get(working_time_params, "end"),
          user_id: user.id,
          user: user
        })
        |> WorkingTimeRepository.insert()
    end
  end

  def get_work_time(%{"id" => id}) do
    case WorkingTimeRepository.get_by_id(id) do
      nil ->
        {:error, "Working time not found"}

      working_time ->
        {:ok, working_time}
    end
  end

  def get_work_time_by_user_id_and_time_range(%{"userID" => userID, "start_time" => start_time, "end_time" => end_time}) do
    case UserRepository.get_by_id(userID) do
      nil ->
        {:error, "User not found"}

      user ->
        WorkingTimeRepository.get_by_user_id(user.id)
        |> Enum.map(fn working_time ->
          %{
            id: working_time.id,
            start_time: working_time.start_time,
            end_time: working_time.end_time,
            user_id: working_time.user_id
          }
        end)
      |> IO.inspect()

    end
  end

  def update_working_time(%{"id" => id, "working_time" => working_time_params}) do
    case WorkingTimeRepository.get_by_id(id) do
      nil ->
        {:error, "Working time not found"}
      working_time ->
        working_time
        |> WorkingTimeRepository.update(working_time_params)
    end
  end

  def delete_working_time(working_time) do
    WorkingTimeRepository.delete(working_time)
  end
end
