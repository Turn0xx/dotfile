defmodule TimeManager do
  @moduledoc false
 

  def domain_model do
    quote do
      @self __MODULE__
      use Ecto.Schema
    end
  end

  def domain_service do
    quote do
    end
  end

  def application_service do
    quote do
      alias App.Repo
    end
  end

  def repository do
    quote do
      alias App.Repo
      import Ecto.Query, warn: false
      import Ecto.Changeset
    end
  end

  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
