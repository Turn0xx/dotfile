defmodule TimeManagerWeb.ErrorView do

  def render("404.json", _assigns) do
    %{errors: %{detail: "Resource not found"}}
  end

  def render("500.json", _assigns) do
    %{errors: %{detail: "Internal server error"}}
  end

  def render("401.json", _assigns) do
    %{errors: %{detail: "Unauthorized"}}
  end

  def render("422.json", changeset) do
    # You can customize this to format your changeset errors as you please
    errors = Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)

    %{errors: errors}

  end
end
