defmodule TimeManager.UserRepository do
  use TimeManager, :repository

  alias TimeManager.User


  def changeset(user , attr) do
    user
    |> cast(attr, [:username, :email])
    |> validate_required([:username, :email])
    |> unique_constraint(:email)
  end

  def get_all() do
    Repo.all(User)
  end

  def get_by_id(id) do
    Repo.get(User, id)
  end

  def insert(%TimeManager.User{} = user) do
    user
    |> changeset()
    |> Repo.insert()
  end

  # def update(params) do
  #   Repo.get(User, params.id)
  #   |> User.update_user(params)
  #   |> Repo.update()
  # end

  # def delete(id) do
  #   Repo.get(User, id)
  #   |> Repo.delete()
  # end

end
