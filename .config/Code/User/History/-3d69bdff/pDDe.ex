defmodule TimeManager.User do
  @moduledoc false

  defstruct [:id, :username, :email]

  def changeset(user, attrs) do
    user
    |> Map.from_struct()
    |> Map.merge(attrs)
    |> Map.put(:id, user.id)
    |> Map.put(:username, user.username)
    |> Map.put(:email, user.email)
  end

end
