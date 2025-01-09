defmodule TimeManager.TimeTracking.Application.ManageWorkingTimeService do
  alias TimeManager.TimeTracking.{WorkingTime, Infrastructure.WorkingTimeRepository}
  alias TimeManager.UserRepository

  def create_working_time(%{"userID" => userID, "working_time" => working_time_params}) do
    case UserRepository.get_by_id(userID) do
      nil ->
        IO.puts("User not found")
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

  def get_work_time(%{"userID" => userID, "id" => id}) do
    case UserRepository.get_by_id(userID) do
      nil ->
        IO.puts("User not found")
        {:error, "User not found"}

      user ->
        case WorkingTimeRepository.get_by_id(id) do
          nil ->
            IO.puts("Working time not found")
            {:error, "Working time not found"}

          working_time ->
            {:ok, working_time}
        end
    end
  end
end
