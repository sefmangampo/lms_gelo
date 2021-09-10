class CreateLeaveTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :leave_types do |t|
      t.string :name
      t.boolean :ispaid
      t.boolean :active
      t.string :description
      

      t.timestamps
    end
  end
end
