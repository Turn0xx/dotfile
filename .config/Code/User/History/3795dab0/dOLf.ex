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

  def get_user_by_email_and_username(email, username) do
    case UserRepository.get_by_email_and_username(email, username) do
      nil -> {:error, "User not found"}
      user -> {:ok, user}
    end
  end

  def create_user(params) do
    %User{}
    |> UserRepository.changeset(params)
    |> UserRepository.insert()
  end

  def update_user(params) do
    user = UserRepository.get_by_id(params.id)
    case user do
      nil -> {:error, "User not found"}
      user ->
        user
        |> User.update_user(params)
        |> UserRepository.update()
    end
  end

end
