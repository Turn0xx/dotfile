defmodule TimeManager.TimeTracking.Infrastructure.WorkingTimeRepository do
  use TimeManager, :repository

  alias TimeManager.TimeTracking.WorkingTime


  import UUIDValidator

  def insert(working_time) do
    working_time
    |> Repo.insert()
  end

  def get_by_id(id) do
    with {:ok, id} <- valide_uuid(id) do
      Repo.get(WorkingTime, id)
    else
      _ -> nil
    end
  end

  def get_by_user_id(user_id) do
    with {:ok, user_id} <- valide_uuid(user_id) do
      Repo.get_by(WorkingTime, user_id: user_id)
    else
      _ -> nil
    end
  end

  def update(working_time, params) do
    working_time
    |> Repo.update(params)
  end
end
