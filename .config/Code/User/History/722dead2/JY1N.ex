defmodule TimeManager.TimeTracking.Infrastructure.WorkingTimeRepository do
  use TimeManager, :repository

  alias TimeManager.TimeTracking.WorkingTime

  def insert(working_time) do
    working_time
    |> Repo.insert()
  end

  

end
