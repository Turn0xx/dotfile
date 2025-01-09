defmodule TimeManager.ManageUserService do
  use TimeManager, :application_service

  alias TimeManager.User

  def get_users() do
    Repo.all(User)
  end

  def get_user_by_id(id) do
    Repo.get(User, id)
  end

  def create_user(params) do
    User.new(params)
    |> Repo.insert()
  end

  def update_user(params) do
    Repo.get(User, params.id)
    |> User.update_user(params)
    |> Repo.update()
  end

  def delete_user(id) do
    Repo.get(User, id)
    |> Repo.delete()
  end

end