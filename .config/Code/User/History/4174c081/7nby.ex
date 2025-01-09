defmodule TimeManager.Infrastructure.UserPresenter do
  alias TimeManager.User

  def present_user(%{user: %User{} = user}) do
    %{
      username: user.username,
      email: user.email
    }
  end

  def present_users(%{users: users}) do
    %{data: for(user <- users, do: present_user(%{user: user}))}
  end
end
