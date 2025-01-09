defmodule TimeManager.TimeTracking.Infrastructure.WorkingTimeRepository do
  use TimeManager, :repository

  def insert(working_time) do
    working_time
    |> Repo.insert()
  end



end
