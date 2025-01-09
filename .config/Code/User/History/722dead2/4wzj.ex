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
      from(w in WorkingTime, where: w.user_id == ^user_id)
      |> Repo.all()
    else
      _ -> nil
    end
  end

  def get_by_user_id_and_time_range(user_id, start_time, end_time) do
    from(wt in WorkingTime,
      where: wt.user_id == ^user_id and
             wt.start_time >= ^start_time and
             wt.end_time <= ^end_time
    )
    |> Repo.all()
  end

  def update(working_time, params) do
    working_time
    |> WorkingTime.changeset(params, :update)
    |> Repo.update()
  end

  def delete(working_time) do
    Repo.delete(working_time)
  end
end
