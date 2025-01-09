defmodule TimeManager.UserRepository do
  use TimeManager, :repository

  alias TimeManager.Accounts.User

  import UUIDValidator

  def changeset(user , attr) do
    user
    |> cast(attr, [:username, :email])
    |> validate_required([:username, :email])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
  end

  def get_all() do
    Repo.all(User)
  end

  def get_by_id(id) do
    with {:ok, id} <- valide_uuid(id) do
      Repo.get(User, id)
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

  def insert(user) do
    user
    |> Repo.insert()
  end

  def get_by_email_and_username(email, username) do
    Repo.get_by(User, email: email, username: username)
  end

  def update(user, params) do
    user
    |> changeset(params)
    |> Repo.update()
  end

  def delete(user) do
    Repo.delete(user)
  end

end
