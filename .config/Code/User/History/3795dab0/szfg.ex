defmodule TimeManager.ManageUserService do
  use TimeManager, :application_service

  alias TimeManager.{User , UserRepository}

  def get_users() do
    UserRepository.all(User)
  end

  def get_user_by_id(id) do
    UserRepository.get(User, id)
  end

  def create_user(params) do
    User.new(params)
    |> UserRepository.insert()
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
