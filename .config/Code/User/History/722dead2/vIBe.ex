defmodule TimeManager.TimeTracking.Infrastructure.WorkingTimeRepository do
  use TimeManager, :repository

  def insert(working_time) do
    working_time
    |> Repo.insert()
  end

  def get_by_id(id) do
    Repo.get(WorkingTime, id)
  end



end
