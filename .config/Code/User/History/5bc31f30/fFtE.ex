defmodule TimeManager.TimeTracking.Application.ManageWorkingTimeService do
  alias TimeManager.TimeTracking.{WorkingTime, Infrastructure.WorkingTimeRepository}
  alias TimeManager.UserRepository

  def create_working_time(%{"userID" => userID, "working_time" => working_time_params}) do
    IO.inspect(userID)
    IO.inspect(Map.get(working_time_params, "start"))
    IO.inspect(Map.get(working_time_params, "end"))

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
end
