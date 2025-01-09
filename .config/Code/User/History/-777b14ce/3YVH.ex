defmodule TimeManager.TimeTracking.WorkingTime do
  use TimeManager, :domain_model

  alias TimeManager.Accounts.User
  alias TimeManager.TimeTracking.WorkingTime

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "working_times" do
    field :start_time, :utc_datetime
    field :end_time, :utc_datetime
    belongs_to :user, User

    timestamps(type: :utc_datetime)
  end

  def changeset(working_time, attrs) do
    working_time
    |> cast(attrs, [:start_time, :end_time, :user])
    |> validate_required([:start_time, :end_time, :user_id])
    |> assoc_constraint(:user)
  end
end
