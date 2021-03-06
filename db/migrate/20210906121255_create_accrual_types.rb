class CreateAccrualTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :accrual_types do |t|
      t.string :name
      t.boolean :active
      t.integer :frequencyid
      t.boolean :internal

      t.timestamps
    end
  end
end
