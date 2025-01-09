defmodule TimeManager do
  @moduledoc false
  def domain_model do
    quote do
      @self __MODULE__
      use Ecto.Schema

      import Ecto.Changeset
    end
  end

  def application_service do
    quote do
      alias TimeManager.Repo
    end
  end

  def repository do
    quote do
      alias TimeManager.Repo
      import Ecto.Query, warn: false
      import Ecto.Changeset
    end
  end

  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
