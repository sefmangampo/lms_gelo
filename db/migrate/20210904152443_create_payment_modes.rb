class CreatePaymentModes < ActiveRecord::Migration[6.1]
  def change
    create_table :payment_modes do |t|
      t.string :name
      t.boolean :active
      t.boolean :useincutoffs
      t.timestamps
    end
  end
end
