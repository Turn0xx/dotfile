defmodule TimeManager.TimeTracking.Application.ManageClockService do
  alias TimeManager.TimeTracking.{Clock, Infrastructure.ClockRepository}
  alias TimeManager.Accounts.Infrastructure.UserRepository

  def get_clocks(%{"userID" => userID}) do
    case UserRepository.get_by_id(userID) do
      nil ->
        {:error, "User not found"}

      user ->
        {:ok, ClockRepository.get_by_user_id(user.id)}
    end
  end

  def create_clock(%{"userID" => userID, "clock" => clock_params}) do
    case UserRepository.get_by_id(userID) do
      nil ->
        {:error, "User not found"}

      user ->
        %Clock{}
        |> Clock.changeset(%{
          time: Map.get(clock_params, "time"),
          status: Map.get(clock_params, "status"),
          user_id: user.id,
          user: user
        })
        |> ClockRepository.insert()
    end
  end
end
