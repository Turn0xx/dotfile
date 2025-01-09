defmodule TimeManager.TimeTracking.Infrastructure.WorkingTimeRepository do
  use TimeManager, :repository

  alias TimeManager.TimeTracking.WorkingTime

  def changeset(working_time, attrs) do
    working_time
    |> cast(attrs, [:start_time, :end_time, :description])
    |> validate_required([:start_time, :end_time, :description])
  end
end
