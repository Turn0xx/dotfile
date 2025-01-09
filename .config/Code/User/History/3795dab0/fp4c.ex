defmodule TimeManager.ManageUserService do
  use TimeManager, :application_service

  alias TimeManager.User

  def list_users do
    Repo.all(User)
  end

  def get_user_by_id(id) do
    Repo.get(User, id)
  end


end
