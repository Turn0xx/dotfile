defmodule TimeManager.Infrastructure.UserPresenter do
  def present_user(%TimeManager.User{} = user) do
    %{
      id: user.id,
      username: user.username,
      email: user.email
    }
  end
end
