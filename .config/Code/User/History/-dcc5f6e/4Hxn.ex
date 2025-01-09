defmodule TimeManager.UserRepository do
  use TimeManager, :repository

  alias TimeManager.User


  def changeset(user , attr) do
    user
    |> cast(attr, [:username, :email])
    |> validate_required([:username, :email])
    |> unique_constraint(:email)
  end



  def valide_uuid(id) do
    case Ecto.UUID.cast(id) do
      :error -> {:error, "is not a valid UUID"}
      {:ok, valide_id} -> {:ok, valide_id}

    end
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
