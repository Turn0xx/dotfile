defmodule TimeManager.Accounts.Application.ManageUserService do
  use TimeManager, :application_service

  alias TimeManager.Accounts.{User, Infrastructure.UserRepository}

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

  def update_user(user, update_user) do
    user
    |> UserRepository.update(update_user)
  end

  def delete_user(user) do
    user
    |> UserRepository.delete()
  end
end
