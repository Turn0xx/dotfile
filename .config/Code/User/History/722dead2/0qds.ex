defmodule TimeManager.TimeTracking.Infrastructure.WorkingTimeRepository do
  use TimeManager, :repository

  alias TimeManager.TimeTracking.WorkingTime

  alias TimeManager.User

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
      from(wt in WorkingTime,
        # Jointure manuelle avec la table User
        join: u in User,
        # Condition de jointure sur user_id
        on: u.id == wt.user_id,
        # Filtre pour correspondre à l'user_id
        where: u.id == ^user_id,
        # Sélectionne les WorkingTime
        select: wt
      )
      # Récupère tous les résultats
      |> Repo.all()
    else
      _ -> nil
    end
  end

  def update(working_time, params) do
    working_time
    |> Repo.update(params)
  end
end
