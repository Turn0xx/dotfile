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

  def insert(user) do
    user
    |> Repo.insert()
  end

  def get_by_email_and_username(email, username) do
    Repo.get_by(User, email: email, username: username)
  end

  def update(params) do

    user = Repo.get(User, params["id"])
    user
    |> Repo.update()
  end

  # def delete(id) do
  #   Repo.get(User, id)
  #   |> Repo.delete()
  # end

end
