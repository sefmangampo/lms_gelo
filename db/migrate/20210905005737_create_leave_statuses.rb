class CreateLeaveStatuses < ActiveRecord::Migration[6.1]
  def change
    create_table :leave_statuses do |t|
      t.string :name
      t.boolean :active
      t.boolean :internal

      t.timestamps
    end
  end
end
