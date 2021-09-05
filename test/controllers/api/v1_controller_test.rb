require "test_helper"

class Api::V1ControllerTest < ActionDispatch::IntegrationTest
  test "should get PaymentMode" do
    get api_v1_PaymentMode_url
    assert_response :success
  end

  test "should get index" do
    get api_v1_index_url
    assert_response :success
  end
end
