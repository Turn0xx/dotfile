defmodule TimeManager.TimeTracking.Infrastructure.WorkingTimeRepository do
  use TimeManager, :repository

  alias TimeManager.TimeTracking.WorkingTime

  def changeset(working_time, attrs) do
    working_time
    |> cast(attrs, [:start_time, :end_time])
    |> validate_required([:start_time, :end_time])
    |> 
  end

  def insert(working_time) do
    working_time
    |> Repo.insert()
  end
end
