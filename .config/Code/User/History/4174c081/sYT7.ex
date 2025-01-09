defmodule TimeManager.Account.Infrastructure.UserPresenter do
  alias TimeManager.Accounts.User

  def present_user(%{user: %User{} = user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email
    }
  end

  def present_users(%{users: users}) do
    %{data: for(user <- users, do: present_user(%{user: user}))}
  end
end
