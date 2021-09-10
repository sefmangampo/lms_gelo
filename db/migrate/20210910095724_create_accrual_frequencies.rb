class CreateAccrualFrequencies < ActiveRecord::Migration[6.1]
  def change
    create_table :accrual_frequencies do |t|
      t.string :name
      t.float :frequency
      t.boolean :ismonthly
      t.boolean :isyearly
      t.boolean :iscustom

      t.timestamps
    end
  end
end
