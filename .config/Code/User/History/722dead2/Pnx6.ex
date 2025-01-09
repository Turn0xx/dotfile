defmodule TimeManager.TimeTracking.Infrastructure.WorkingTimeRepository do
  use TimeManager, :repository

  alias TimeManager.TimeTracking.WorkingTime

  def changeset(working_time, attrs, userID) do
    working_time
    |> cast(attrs, [:start_time, :end_time])
    |> validate_required([:start_time, :end_time])
    |> validate_length(:start_time, min: 1)
    |> validate_length(:end_time, min: 1)
    |> assoc_constraint(:user_id)
    |> put_assoc(:user, Repo.get(TimeManager.Accounts.User, userID))
    
  end

  def insert(working_time) do
    working_time
    |> Repo.insert()
  end
end
