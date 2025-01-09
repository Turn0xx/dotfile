defmodule TimeManager.User do
  use TimeManager, :domain_model

  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users" do
    field :username, :string
    field :email, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def new(%{"username" => username, "email" => email}) do
    %@self{}
    |> set_username(username)
    |> set_email(email)
  end

  def update_user(%@self{} = user, params) do
    user
    |> set_username(params)
    |> set_email(params)
  end

  defp set_username(user, username) when is_nil(username) == false do
    %{user | username: username}
  end

  defp set_email(user, email) when is_nil(email) == false do
    %{user | email: email}
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email])
    |> validate_required([:username, :email])
    |> unique_constraint(:email)
  end
end
