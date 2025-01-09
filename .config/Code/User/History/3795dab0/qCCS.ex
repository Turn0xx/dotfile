defmodule TimeManager.ManageUserService do
  use TimeManager, :application_service

  alias TimeManager.{User , UserRepository}

  def get_users() do
    UserRepository.get_all()
  end

  def get_user_by_id(id) do
    case UserRepository.get_by_id(id) do
      nil -> {:error, "User not found"}
      user -> {:ok, user}
    end
  end

  def create_user(params) do
    %User{}
    |> UserRepository.changeset(params)
    |> UserRepository.insert()
  end

end
