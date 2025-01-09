defmodule TimeManager.ManageUserService do
  use TimeManager, :application_service

  alias TimeManager.{User , UserRepository}

  def get_users() do
    UserRepository.get_all()
  end

  def get_user_by_id(id) do
    UserRepository.get_by_id(id)
  end

  def create_user(params) do
    UserRepository.changeset(%User{}, params)
    |> User.new()
    |> UserRepository.insert()
  end

end