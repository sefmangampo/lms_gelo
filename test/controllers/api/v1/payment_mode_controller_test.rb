require "test_helper"

class Api::V1::PaymentModeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_payment_mode_index_url
    assert_response :success
  end
end
