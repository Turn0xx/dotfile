defmodule TimeManager.Accounts.User do
  use TimeManager, :domain_model

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users" do
    field :username, :string
    field :email, :string

    timestamps(type: :utc_datetime)
  end


end
