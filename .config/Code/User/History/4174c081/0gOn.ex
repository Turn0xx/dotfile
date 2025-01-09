defmodule TimeManager.Infrastructure.UserPresenter do
  alias TimeManager.User

  def present_user(%{user: %User{} = user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email
    }
  end
end
